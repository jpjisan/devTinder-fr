import React from "react";

function Loading({ text }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">{text}...</p>
      </div>
    </div>
  );
}

export default Loading;
