
export const shortenParticipantID = (pid: string): string => {
  const digits = 6;
  const value = `${pid.slice(0, digits)}...${pid.slice(pid.length - digits)}`;
  return value;
}
