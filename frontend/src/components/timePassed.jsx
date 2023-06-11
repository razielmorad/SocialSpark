const TimePassed = ({ created_at }) => {
  const currentTime = new Date();
  const timeInSecondsNow = currentTime.getTime();
  const convertedDate = new Date(created_at);
  const timeInSecondsPost = convertedDate.getTime();
  const diffInMinutes = (timeInSecondsNow - timeInSecondsPost) / (1000 * 60);
  let formattedTimePassed = "";

  if (diffInMinutes >= 60 * 24 * 7) {
    const diffInWeeks = Math.floor(diffInMinutes / (60 * 24 * 7));

    formattedTimePassed = `${diffInWeeks} ${
      diffInWeeks === 1 ? "week" : "weeks"
    }`;
  } else if (diffInMinutes >= 60 * 24) {
    const diffInDays = Math.floor(diffInMinutes / (60 * 24));
    formattedTimePassed = `${diffInDays} ${diffInDays === 1 ? "day" : "days"}`;
  } else if (diffInMinutes >= 60) {
    const diffInHours = Math.floor(diffInMinutes / 60);
    formattedTimePassed = `${diffInHours} ${
      diffInHours === 1 ? "hour" : "hours"
    }`;
  } else if (diffInMinutes >= 1 && diffInMinutes < 60) {
    const flooredTime = Math.floor(diffInMinutes);
    formattedTimePassed = `${flooredTime} ${
      flooredTime === 1 ? "minute" : "minutes"
    }`;
  } else if (diffInMinutes < 1) {
    return <div className="fw-light">posted just now</div>;
  } else {
    const fullDate = `${convertedDate.getDate()}/${
      convertedDate.getMonth() + 1
    }/${convertedDate.getFullYear()}`;

    return (
      <>
        <div className="fw-light">{fullDate}</div>
      </>
    );
  }

  return <div className="fw-light"> {formattedTimePassed} ago</div>;
};

export default TimePassed;
