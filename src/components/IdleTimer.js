import React from "react";
import { useIdleTimer } from "react-idle-timer";
import { useState } from "react";
import ConfirmationDialog from "../components/dialog/ConfirmationDialog";

const IdleTimer = ({ sessionClearFn }) => {
  const [confirmationDialogData, setConfirmationDialogData] = useState({
    open: false,
    title: "",
    content: "",
    acceptLabel: "",
    declineLabel: "",
    acceptAlert: null,
    declineAlert: null,
  });

  const onPrompt = () => {
    setConfirmationDialogData({
      open: true,
      title: "You have been Idle",
      content: "Your session will get timed out. Do you need to stay?",
      acceptLabel: "Stay",
      declineLabel: "End Session",
      acceptAlert: () => handleDialogBoxAction(true),
      declineAlert: () => handleDialogBoxAction(false),
    });
  };

  const onIdle = () => {
    setConfirmationDialogData((data) => ({ ...data, open: false }));
    sessionClearFn();
  };

  const { reset } = useIdleTimer({
    onPrompt,
    onIdle,

    timeout: 1000 * 60 * 30, // 30 minutes
    promptTimeout: 1000 * 60 * 0.5, // 30 seconds
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
    ],
    immediateEvents: [],
    debounce: 0,
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: false,
    crossTab: false,
    name: "idle-timer",
    syncTimers: 0,
    leaderElection: false,
  });

  const handleDialogBoxAction = (isConfirm) => {
    setConfirmationDialogData((data) => ({ ...data, open: false }));

    if (isConfirm) {
      // User chooses to stay
      reset();
    } else {
      sessionClearFn();
    }
  };

  return (
    <div>
      <ConfirmationDialog confirmationDialogData={confirmationDialogData} />
      {/* <ConfirmationDialog data={confirmDialogDetails} open={showModal} handleSubmit={handleDialogBoxAction} dialogType={DIALOG_TYPES.CUSTOM} disableCloseOnClickOutside={true} confirmFalseBtnTxt="End Session" confirmTrueBtnTxt="Stay" /> */}
    </div>
  );
};

export default IdleTimer;
