import React from "react";
import withLoginRedirect from "../../hoc/withLoginRedirect";

const Task: React.FC = () => {
  return <div>Task</div>;
};

export default withLoginRedirect(Task);
