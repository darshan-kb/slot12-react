import useCountdownWebSocket from "../utils/hooks/useCountdownWebsocket";
const SpinCountdown = () => {
  const countdown = useCountdownWebSocket();
  return <>{countdown}</>;
};

export default SpinCountdown;
