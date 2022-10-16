using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        //protected MappingProfiles()
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();
        }
    }
}