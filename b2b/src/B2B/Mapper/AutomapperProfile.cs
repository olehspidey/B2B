using AutoMapper;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.DomainModels.Companies;
using B2B.Core.Models.DomainModels.Persons;
using B2B.Core.Models.Dtos.Company;
using B2B.Core.Models.Dtos.Person;
using B2B.Core.Models.Dtos.User;

namespace B2B.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateRegistrationUserFormDto, RegistrationUserForm>();

            CreateMap<CreateCompanyDto, Company>();

            CreateMap<EditCompanyDto, Company>();

            CreateMap<CreatePersonDto, Person>();

            CreateMap<CreateAddresDto, Address>();

            CreateMap<User, ExternalUserDto>()
                .ForMember(x => x.UserRoles, expression => expression.AllowNull());

            CreateMap<Company, CompanyDto>()
                .ForMember(x => x.CanEdit, expression => expression.UseValue(false))
                .ForMember(x => x.CanMoveToSuggests, expression => expression.UseValue(false));
        }
    }
}
