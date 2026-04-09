import React from "react";
import STORE_LINKS from "@/config/storeLinks";
import { Edge } from "./brandIcons";

const PartnerCenterSection: React.FC = () => {
  const partnerUrl = STORE_LINKS.partnerCenter || STORE_LINKS.edge;
  if (!partnerUrl) return null;

  return (
    <section id="partner-center" className="section-padding bg-black/6">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <a
            href={partnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card p-6 flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-md bg-white/5 flex items-center justify-center">
              <Edge className="w-6 h-6 text-white" />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-white">Available on Microsoft Partner Center</p>
              <h3 className="text-lg text-white/90 font-black mt-1">PrivacyGuard AI Protector — Version 1.0 <span className="text-green-400 font-bold ml-2">Live</span></h3>
              <p className="text-xs text-white/50 mt-2">Category: Productivity · Visibility: Public · Languages: English (United States)</p>
            </div>

            <div>
              <span className="text-[12px] font-black bg-white/6 px-3 py-2 rounded-full border border-white/8">Visit Listing</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnerCenterSection;
