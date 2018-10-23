﻿using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;

namespace B2B.BLL.Services
{
    public interface IUserCompanyService
    {
        Task<Company> AddCompanyToUserAsync(User user, Company company);
        Task<Company> GetCompanyByIdAsync(int id);
    }
}
