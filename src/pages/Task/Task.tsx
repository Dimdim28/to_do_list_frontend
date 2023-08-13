import { FC } from "react";

import withLoginRedirect from "../../hoc/withLoginRedirect";

const Task: FC = () => {
  return <div>Task</div>;
};

export default withLoginRedirect(Task);
