import { useHistory, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const BlogDetails = () => 
{
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
  const history = useHistory();
  
  const handleClick = () => 
  {
    const updatedBlog = blog; //

    fetch('http://localhost:8000/blogs/' + blog.id, 
    {
      method: 'PUT',
      headers: { //
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedBlog) //
    }).then(() => {
      history.push('/blogs/' + id + '/edit');
    })
  }

  const handleDelete = () => 
  {
    fetch('http://localhost:8000/blogs/' + blog.id, 
    {
      method: 'DELETE',
      
    }).then(() => {
      history.push('/');
    })
  }

  const backHome = () =>
  {
    fetch('http://localhost:8000/blogs/', {
      method: 'GET'
    }).then(() => {
      history.push('/');
    })
  }

  return (
    <div className="blog-details">
      { isPending && <div>Loading...</div> }
      { error && <div>{ error }</div> }
      { blog && (
        <article>

          <h2>Patient Name : { blog.patientName }</h2>
          <br></br>
          <p><strong>Address : </strong>{ blog.address }</p>
          <br></br>
          <p><strong>Hospital Name : </strong>{ blog.hospitalName }</p>
          <br></br>
          <p><strong>Date of Service : </strong>{ blog.dateOfService }</p>
          <br></br>
          <p><strong>Bill Amount :</strong> $ { blog.billAmount }</p>
          <br></br>
          <p><strong>Bill Picture :</strong></p>
          <br></br>
          {blog.billPicture && <img src={blog.billPicture} alt="Preview" />}
          <br></br>
          
          <br></br>

          <div>

          {""}<button onClick={handleClick}>Edit Bill</button> {"------------------------- "} 
          <button onClick={handleDelete}>Delete Bill</button> {"------------------------- "} 
          <button onClick={backHome}>Back Home</button>

          </div>
          
        </article>
      )}
    </div>
  );
}
 
export default BlogDetails;