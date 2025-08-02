import React from 'react';
import OverviewCards from './OverviewCards';
import AnalyticsPanel from './AnalyticsPanel';
import StaffAlerts from './StaffAlerts';
import AcademicSummary from './AcademicSummary';
import QuickActions from './QuickActions';

const Principal = () => {
  return (
    <div className="p-6 space-y-6">
      <OverviewCards />
      <AnalyticsPanel />
      <StaffAlerts />
      <AcademicSummary />
      <QuickActions />
    </div>
  );
};

export default Principal;
