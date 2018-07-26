using AngularBlog.DAL;
using AngularBlog.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace AngularWebApi.Controllers
{
    public class PostController : ApiController
    {
        DbBlogAngularContext dbBlogAngularContext = new DbBlogAngularContext();
        //[Authorize]

        [AllowAnonymous]
        // GET: api/Blog
        public IQueryable<Post> GetPosts()
        {
            Post[] posty = dbBlogAngularContext.Posts.ToArray();
            foreach (var item in posty)
            {
                item.Comments = dbBlogAngularContext.Comments.Where(x => x.IdPost == item.Id).ToArray();
            }
            return dbBlogAngularContext.Posts;
        }

        [AllowAnonymous]
        // GET: api/Blog/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult GetPosts(int id)
        {
            Post posts = dbBlogAngularContext.Posts.Find(id);
            if (posts == null)
            {
                return NotFound();
            }

            return Ok(posts);
        }

        [AllowAnonymous]
        // PUT: api/Blog/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPosts(int id, Post post)
        {
            post.Id = id;
            post.CreationDate = DateTime.Now;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != post.Id)
            {
                return BadRequest();
            }

            dbBlogAngularContext.Entry(post).State = EntityState.Modified;

            try
            {
                dbBlogAngularContext.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }


        [AllowAnonymous]
        // POST: api/Blog
        [ResponseType(typeof(Post))]
        public IHttpActionResult PostPosts(Post posts)
        {
            posts.CreationDate = DateTime.Now;
            posts.Id = dbBlogAngularContext.Posts.Count() + 1;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dbBlogAngularContext.Posts.Add(posts);
            dbBlogAngularContext.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = posts.Id }, posts);
        }

        [AllowAnonymous]

        // DELETE: api/Blog/5
        [ResponseType(typeof(Post))]
        public IHttpActionResult DeletePosts(int id)
        {
            Post posts = dbBlogAngularContext.Posts.Find(id);
            if (posts == null)
            {
                return NotFound();
            }
            foreach (var item in dbBlogAngularContext.Comments)
            {
                if (item.IdPost == posts.Id)
                    dbBlogAngularContext.Comments.Remove(item);
            }
            dbBlogAngularContext.Posts.Remove(posts);

            dbBlogAngularContext.SaveChanges();

            return Ok(posts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                dbBlogAngularContext.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostsExists(int id)
        {
            return dbBlogAngularContext.Posts.Count(e => e.Id == id) > 0;
        }
    }
}
