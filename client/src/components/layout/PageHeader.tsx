import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge = "Nextcare Dental" }: PageHeaderProps) {
  return (
    <div className="py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-[10%] w-64 h-64 rounded-full bg-[#36B5A6]/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-[10%] w-80 h-80 rounded-full bg-[#00ADDD]/10 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="text-center">
          {badge && (
            <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4 shadow-sm">
              {badge}
            </div>
          )}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-800 mb-5 relative inline-block">
            {title}
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary/40 via-[#00ADDD]/40 to-[#36B5A6]/40 rounded-full"></span>
          </h1>
          <p className="text-base md:text-lg text-center max-w-2xl mx-auto text-neutral-600 mt-6">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}