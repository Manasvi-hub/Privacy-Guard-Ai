import React from "react";

const SkeletonDemo: React.FC = () => (
  <div className="max-w-3xl mx-auto p-6">
    <div className="glass-card p-6 space-y-4">
      <div className="h-6 rounded w-1/3 skeleton" />
      <div className="h-8 rounded w-2/3 skeleton" />
      <div className="h-48 rounded skeleton" />
      <div className="flex gap-3">
        <div className="h-8 w-20 rounded skeleton" />
        <div className="h-8 w-20 rounded skeleton" />
      </div>
    </div>
  </div>
);

export default SkeletonDemo;
