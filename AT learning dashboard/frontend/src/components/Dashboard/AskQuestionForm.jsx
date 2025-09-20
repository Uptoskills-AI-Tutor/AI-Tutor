import React from "react";

const AskQuestionForm = () => {
  return (
    <div className="bg-white rounded-lg p-5 shadow-sm border">
      <h2 className="text-base font-semibold mb-3">Ask a Question</h2>

      <input
        type="text"
        placeholder="Title of your question..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
      />

      <textarea
        placeholder="Describe your doubt in detail..."
        rows={4}
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
      />

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-4 text-gray-500 text-sm">
          <button className="flex items-center gap-1 hover:text-primary-500">
            <i className="ri-image-line"></i> Image
          </button>
          <button className="flex items-center gap-1 hover:text-primary-500">
            <i className="ri-code-line"></i> Code
          </button>
          <button className="flex items-center gap-1 hover:text-primary-500">
            <i className="ri-at-line"></i> Mention
          </button>
        </div>

        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm">
          Post Question
        </button>
      </div>
    </div>
  );
};

export default AskQuestionForm;
