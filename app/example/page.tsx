"use client";
import { useState } from "react";
const Tabs = ({ tabsData }) => {
  const [activeTab, setActiveTab] = useState(0); // State to track the active tab index

  return (
    <div>
      {/* Tab Buttons */}
      <div className="tab-list">
        {tabsData.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? "active" : ""}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {tabsData[activeTab] && tabsData[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
