
export const shortenParticipantID = (pid: string, length?: number): string => {
  const digits = length || 6;
  const value = `${pid.slice(0, digits)}...${pid.slice(pid.length - digits)}`;
  return value;
}
