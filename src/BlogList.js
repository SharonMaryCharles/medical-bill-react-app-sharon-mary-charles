import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => 
{
  return (
    <div className="blog-list">

      <h2>List of Bills</h2>

      {
      blogs.map(blog => 
      (
        <div className="blog-preview" key={blog.id} >
          <Link to={`/blogs/${blog.id}`}>

            <h3>{ blog.patientName }</h3>
            <p>Submitted on { blog.dateOfService }</p>
            
          </Link>
        </div>
      ))}
    </div>
  );
}
 
export default BlogList;