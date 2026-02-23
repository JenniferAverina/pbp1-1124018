import './App.css'

function App() {
  const getPosts = async () => {
    const getuserInfo = await fetch("http://localhost:5173/api/post", {
      method: "GET",
      headers: {
        "content-type": "application/json"
      },
    })
    const data = await getuserInfo.json();
    console.log(data.records);
  }

  getPosts();

return <div>

</div>
}

export default App
