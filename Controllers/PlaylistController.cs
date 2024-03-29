﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using moody.Extensions;
using moody.Models;
namespace moody.Controllers
{
    [Produces("application/json")]
    [Route("api/Playlist")]
    public class PlaylistController : Controller
    {
        [HttpGet("[action]")]
        public bool AddToPlayList(MoodyContext db, int id)
        {
            Member member = HttpContext.Session.Get<Member>("MEMBER");
            bool added = false;
            if (member != null)
            {
                Playlist item = new Playlist
                {
                    SongId = id,
                    UserId = member.UserId
                };
                try
                {
                    db.Playlist.Add(item);
                    db.SaveChanges();
                    added = true;
                }
                catch (Exception) { }
            }
            return added;
        }

        [HttpGet("[action]")]
        public bool RemoveFromPlayList(MoodyContext db, int id)
        {
            Member member = HttpContext.Session.Get<Member>("MEMBER");
            bool deleted = false;
            if (member != null)
            {
                try
                {
                    db.Playlist.Remove(db.Playlist.Where(a => (a.SongId == id && a.UserId == member.UserId)).First());
                    db.SaveChanges();
                    deleted = true;
                }
                catch (Exception) { }
            }
            return deleted;
        }

        [HttpGet("[action]")]
        public IEnumerable<Playlist> LoadPlayList(MoodyContext db)
        {
            Member member = HttpContext.Session.Get<Member>("MEMBER");
            return (member != null) ? db.Playlist.Where(s => (s.UserId==member.UserId)) : null;
        }
    }
}