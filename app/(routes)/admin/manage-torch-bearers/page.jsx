import React from "react";

import { RedirectCard } from "./_components/redirect-card";

const ManageTorchBearerPage = () => {
  const redirectArray = [
    {
      cardTitle: "Manage Campus Ambassador",
      redirectUrl: "/admin/manage-torch-bearers/manage-campus-ambassador",
      cardInfo: "View, Add and manage Campus Ambassador",
    },
    {
      cardTitle: "Manage Coordinator",
      redirectUrl: "/admin/manage-torch-bearers/manage-coordinator",
      cardInfo: "View, Add and manage Coordinator",
    },
    {
      cardTitle: "Manage Event Coordinator Assignment",
      redirectUrl:
        "/admin/manage-torch-bearers/manage-event-coordinator-assignment",
      cardInfo: "View, Add and manage Coordinator-Event relationship",
    },
    {
      cardTitle: "Manage Hospitality User",
      redirectUrl: "/admin/manage-torch-bearers/manage-hospitality-user",
      cardInfo: "View, Add and manage Hospitality User",
    },
    {
      cardTitle: "Manage School Facilitator",
      redirectUrl: "/admin/manage-torch-bearers/manage-school-facilitator",
      cardInfo: "View, Add and manage School Facilitator",
    },
  ];

  return (
    <React.Fragment>
      <div className="grid w-11/12 mx-auto grid-cols-1 gap-3 lg:grid-cols-3 mb-6">
        {redirectArray.map((card, index) => (
          <RedirectCard
            key={index}
            cardTitle={card.cardTitle}
            redirectUrl={card.redirectUrl}
            cardInfo={card.cardInfo}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ManageTorchBearerPage;
