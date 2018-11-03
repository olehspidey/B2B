﻿using System.Collections.Generic;
using System.Threading.Tasks;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Companies;

namespace B2B.BLL.Services
{
    public interface IUserCompanyService
    {
        Task<Company> AddCompanyToUserAsync(User user, Company company);
        Task<Company> GetCompanyByIdAsync(int id);
        Task<ICollection<Company>> GetByCategoryAsync(CompanyCategory category);
    }
}