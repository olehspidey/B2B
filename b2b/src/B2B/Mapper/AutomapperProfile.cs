using AutoMapper;
using B2B.Core.Models.DomainModels;
using B2B.Core.Models.Dtos.User;

namespace B2B.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<CreateRegistrationUserFormDto, RegistrationUserForm>();
        }
    }
}
