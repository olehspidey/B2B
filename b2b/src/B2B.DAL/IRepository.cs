using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace B2B.DAL
{
    public interface IRepository<TEntity, in TKey> where TEntity : class
    {
        IQueryable<TEntity> Table { get; }

        Task<TEntity> GetByIdAsync(TKey id);
        Task<int> InsertAsync(TEntity entity);
        Task<int> UpdateAsync(TEntity entity);
        Task<int> UpdateAsync(ICollection<TEntity> entities);
        Task<int> DeleteAsync(TEntity entity);
        Task<int> DeleteAsync(ICollection<TEntity> entities);
    }
}
