using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AngularBlog.DAL;
using AngularWebApi.Models;

namespace AngularWebApi.Controllers
{
    public class BlogController : ApiController
    {
        DbBlogAngularContext dbBlogAngularContext = new DbBlogAngularContext();


        private DbBlogModel db = new DbBlogModel();

        // GET: api/Blog
        public IQueryable<Posts> GetPosts()
        {
            return db.Posts;
        }

        // GET: api/Blog/5
        [ResponseType(typeof(Posts))]
        public IHttpActionResult GetPosts(int id)
        {
            Posts posts = db.Posts.Find(id);
            if (posts == null)
            {
                return NotFound();
            }

            return Ok(posts);
        }

        // PUT: api/Blog/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPosts(int id, Posts posts)
        {
            posts.Id = id;
            posts.CreationDate = DateTime.Now;
            posts.Likes = 0;
            posts.Views = 0;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != posts.Id)
            {
                return BadRequest();
            }

            db.Entry(posts).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
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

        // POST: api/Blog
        [ResponseType(typeof(Posts))]
        public IHttpActionResult PostPosts(Posts posts)
        {
            posts.CreationDate = DateTime.Now;
            posts.Likes = 0;
            posts.Views = 0;
            posts.Id = db.Posts.Count() + 1;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Posts.Add(posts);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = posts.Id }, posts);
        }

        // DELETE: api/Blog/5
        [ResponseType(typeof(Posts))]
        public IHttpActionResult DeletePosts(int id)
        {
            Posts posts = db.Posts.Find(id);
            if (posts == null)
            {
                return NotFound();
            }

            db.Posts.Remove(posts);
            db.SaveChanges();

            return Ok(posts);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PostsExists(int id)
        {
            return db.Posts.Count(e => e.Id == id) > 0;
        }
    }
}