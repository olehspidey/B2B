namespace B2B.Core.Models.DomainModels
{
    public interface IEntity<TKey>
    {
        TKey Id { get; set; }
    }
}
