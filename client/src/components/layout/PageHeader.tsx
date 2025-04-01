import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge = "Nextcare Dental" }: PageHeaderProps) {
  return (
    <div className="page-gradient py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-[#36B5A6]/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-[10%] w-80 h-80 rounded-full bg-[#00ADDD]/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center">
          {badge && (
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-medium rounded-full text-sm mb-4">
              {badge}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">{title}</h1>
          <p className="text-lg text-center max-w-2xl mx-auto text-neutral-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}