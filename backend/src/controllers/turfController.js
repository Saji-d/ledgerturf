const Turf = require('../models/Turf');
const asyncHandler = require('../utils/asyncHandler');
const { TURF_STATUS } = require('../utils/constants');

// @desc    Get all turfs (with filters & pagination)
// @route   GET /api/turfs
// @access  Public
exports.getTurfs = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit', 'lat', 'lng', 'distance'];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

  // Base query: Only show approved turfs to public
  let baseQuery = JSON.parse(queryStr);
  if (!req.user || req.user.role !== 'superAdmin') {
    baseQuery.status = TURF_STATUS.APPROVED;
  }

  // GeoJSON Spatial search
  if (req.query.lat && req.query.lng) {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const distance = parseFloat(req.query.distance) || 10; // Default 10km

    // 6378.1 km is Earth's radius
    const radius = distance / 6378.1;

    baseQuery.location = {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    };
  }

  query = Turf.find(baseQuery);

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Turf.countDocuments(baseQuery);

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const turfs = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: turfs.length,
    pagination,
    data: turfs,
  });
});

// @desc    Get single turf
// @route   GET /api/turfs/:id
// @access  Public
exports.getTurf = asyncHandler(async (req, res, next) => {
  const turf = await Turf.findById(req.params.id);

  if (!turf) {
    res.status(404);
    throw new Error(`Turf not found with id of ${req.params.id}`);
  }

  res.status(200).json({ success: true, data: turf });
});

// @desc    Create new turf
// @route   POST /api/turfs
// @access  Private (Owner)
exports.createTurf = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.owner = req.user.id;

  // Handle GeoJSON
  if (req.body.coordinates) {
    req.body.location = {
      type: 'Point',
      coordinates: req.body.coordinates, // [lng, lat]
    };
  }

  // Handle image uploads
  if (req.files) {
    req.body.images = req.files.map(file => file.path);
  }

  const turf = await Turf.create(req.body);

  res.status(201).json({ success: true, data: turf });
});

// @desc    Update turf
// @route   PUT /api/turfs/:id
// @access  Private (Owner/Admin)
exports.updateTurf = asyncHandler(async (req, res, next) => {
  let turf = await Turf.findById(req.params.id);

  if (!turf) {
    res.status(404);
    throw new Error(`Turf not found with id of ${req.params.id}`);
  }

  // Make sure user is owner or admin
  if (turf.owner.toString() !== req.user.id && req.user.role !== 'superAdmin') {
    res.status(401);
    throw new Error(`User ${req.user.id} is not authorized to update this turf`);
  }

  // Reset status to pending if updated by owner (unless admin)
  if (req.user.role !== 'superAdmin') {
    req.body.status = TURF_STATUS.PENDING;
  }

  turf = await Turf.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: turf });
});

// @desc    Delete turf
// @route   DELETE /api/turfs/:id
// @access  Private (Owner/Admin)
exports.deleteTurf = asyncHandler(async (req, res, next) => {
  const turf = await Turf.findById(req.params.id);

  if (!turf) {
    res.status(404);
    throw new Error(`Turf not found with id of ${req.params.id}`);
  }

  // Make sure user is owner or admin
  if (turf.owner.toString() !== req.user.id && req.user.role !== 'superAdmin') {
    res.status(401);
    throw new Error(`User ${req.user.id} is not authorized to delete this turf`);
  }

  await turf.deleteOne();

  res.status(200).json({ success: true, data: {} });
});

// @desc    Approve or Reject turf
// @route   PUT /api/turfs/:id/approve
// @access  Private (Admin)
exports.approveTurf = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  if (![TURF_STATUS.APPROVED, TURF_STATUS.REJECTED].includes(status)) {
    res.status(400);
    throw new Error('Please provide a valid status (approved or rejected)');
  }

  const turf = await Turf.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!turf) {
    res.status(404);
    throw new Error(`Turf not found with id of ${req.params.id}`);
  }

  res.status(200).json({ success: true, data: turf });
});
