import React from 'react';

const FormInput = ({ 
  label, 
  error, 
  icon: Icon, 
  type = "text", 
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-widest">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`}>
            <Icon size={20} />
          </div>
        )}
        <input
          type={type}
          className={`
            w-full py-4 rounded-2xl border-2 transition-all outline-none
            ${Icon ? 'pl-12 pr-4' : 'px-6'}
            ${error 
              ? 'border-red-100 bg-red-50 text-red-900 focus:border-red-400' 
              : 'border-gray-50 bg-gray-50 focus:bg-white focus:border-primary text-gray-900'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-xs font-bold text-red-500 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
