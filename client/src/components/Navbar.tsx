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
  const [videoUrl, setVideoUrl] = useState<string>(array2[0].link)
  const [playState, setPlayState] = useState<boolean>(false)
  const [des, setdes] = useState<string>(array2[0].name)
  const [post,setpost]=useState<any>([])
  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    axios
      .get("http://localhost:9000/search")
      .then((res: any) => {
        setdescription(res?.data?.description)
        seturl(res?.data?.url)
      })
      .catch((err) => {
        console.log(err);
      });
  };
// const handleSearch=(e:any)=>{
//   const value=e.target.value
//  return (<>
//  {
//   array2.filter((item) => {
//     return value.toLowerCase() === ''
//       ? item
//       : item.name.toLowerCase().includes(value);
//   })
//   .map((item, index) => (
//     console.log(
//       <li><tr key={index}>
//       <td>{item.name}</td>
//       <td>{item.link}</td>
//       <td>{item.date}</td>
//     </tr></li>)
//   ))
//  }</>)}

  const handleevent = (link: string,desc:string) => {
    setVideoUrl(link);
    setPlayState(true);
    setdes(desc)
  }
  return (
    <div>
      <div className="search-filed">
        <input id="search-bar" placeholder="search"
            onChange={(e)=>{
              setpost( array2.filter(param=>param.name.toLowerCase().includes(e.target.value))) 
          }}
        />
      </div>
      <div className="parent">
        <div className="child c1">
          <ReactPlayer url={videoUrl} playing={playState} />
          <p style={{ border: "1px solid lightgrey" }}>
           {des}
          </p>
        </div>
        <div className="container child" ref={tragetRef} id="videos">

          {post.map((movie:any) => (
            <div
              key={movie.name}
              className="flex-container"
              style={{
                width: "340px",
                height: "150px",
                border: "1px solid lightGrey",
                cursor: "pointer",
              }}
              onClick={() => { handleevent(movie.link,movie.name) }}
            >
              <div
                style={{
                  marginTop: "1rem",
                  padding: "10px",
                }}>
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
