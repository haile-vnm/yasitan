import { ButtonHTMLAttributes } from 'react';
import { DOMAttributes } from 'react';
import If from './if';

const BUTTON_CATEGORY = {
  primary:
    ' border border-blue-200 bg-blue-100 text-blue-900 hover:bg-blue-200 focus-visible:ring-blue-500',
  white:
    ' border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-offset-white focus:ring-blue-600',
};

interface ButtonExtendAttributes {
  category?: keyof typeof BUTTON_CATEGORY;
  processing?: boolean;
}

export default function AppButton(
  props: ButtonHTMLAttributes<HTMLButtonElement> &
    DOMAttributes<HTMLButtonElement> &
    ButtonExtendAttributes,
) {
  return (
    <button
      {...props}
      className={`inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        BUTTON_CATEGORY[props.category || 'primary']
      } ${props.className || ''}`}
    >
      {props.children}
      <If condition={props.processing}>
        <span className="relative flex self-center h-3 w-3 ml-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-300"></span>
        </span>
      </If>
    </button>
  );
}
