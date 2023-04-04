import React, {
  useEffect,
  ReactElement,
  ReactHTMLElement,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import axios from "axios";
const array2 = [
  {
    name: "React with typescript | Simple User Search System",
    date: "02/03/2021",
    link: "https://youtu.be/E0BqKhZA6Ao",
  },
  {
    name: "Search User and Create Chat APIs - MERN Stack Chat App with Socket.IO #10",
    date: "12/09/2021",
    link: "https://youtu.be/HArC6GxkMMI",
  },
  {
    name: "Realtime chat application using NodeJs and socket.io in Hindi",
    date: "02/09/2025",
    link: "https://youtu.be/_gikjdpWmcI",
  },
  {
    name: "NodeJs and socket.io in Hindi",
    date: "02/09/2025",
    link: "https://www.youtube.com/live/1vhYxdB4xiM?feature=share",
  },
  {
    name: " MERN Stack Chat App with Socket.IO #10",
    date: "12/09/2021",
    link: "https://youtu.be/HArC6GxkMMI",
  },
];
const Navbar: React.FC = () => {
  const tragetRef = useRef<HTMLDivElement>(null);
  const [description, setdescription] = useState<any>([]);
  const [url, seturl] = useState<any>([]);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    axios
      .get("http://localhost:8000/search")
      .then((res: any) => {
        setdescription(res?.data?.description)
        seturl(res?.data?.url)
      })
      .catch((err) => {
        console.log(err);
      });
  };
 const handleevent=()=>{

 }
  console.log(description)
  console.log(url)
  return (
    <div>
      <div className="search-filed">
        <input id="search-bar" placeholder="search" />
      </div>
      <div className="parent">
        <div className="child c1">
          {/* {
            titles
          } */}
          <ReactPlayer url="https://youtu.be/HArC6GxkMMI" />
          <p style={{ border: "1px solid lightgrey" }}>
            Search User and Create Chat APIs - MERN Stack Chat App with
            Socket.IO #10
          </p>
        </div>
        <div className="container child" ref={tragetRef} id="videos" onClick={handleevent}>

          {array2.map((movie) => (
            <div
              key={movie.name}
              className="flex-container"
              style={{
                width: "340px",
                height: "150px",
                border: "1px solid lightGrey",
              }}
            >
              <div style={{ marginTop: "1rem" }}>
                <ReactPlayer width="180px" height="100px" url={movie.link} />
              </div>
              <div
                style={{ width: "35rem", height: "4rem", marginTop: "1rem" }}
              >
                {movie.name} <br /> {movie.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
