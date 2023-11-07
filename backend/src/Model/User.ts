type User = {
  username: string;
  password: string;
  email: string;
  timeJoined: string;
  level: number;
  xp: number;
  testStarted: number;
  testCompleted: number;
  timeTyping: string;
  typingStats: {
    w10: {
      times: number;
      avgAccuracy: number;
    };
    w30: {
      times: number;
      avgAccuracy: number;
    };
    w60: {
      times: number;
      avgAccuracy: number;
    };
  };
};

export default User;
