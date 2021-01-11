﻿using MyTestApp.Enums;

namespace MyTestApp.Entities
{
    public class User
    {
        public int Id { get; set; }
        public UserType Type { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
