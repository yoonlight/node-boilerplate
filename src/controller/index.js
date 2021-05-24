class Controller {
  constructor(container, entity) {
    const conn = container.get('sql').conn
    this.repo = conn.getRepository(entity).createQueryBuilder()
    this.whereQuery = 'id = :id'
  }

  async get(cond) {
    return await this.repo.where(cond).getOne()
  }

  async list(query) {
    const pageNum = query.pageNum | 0
    const pageCount = query.pageCount | 5
    const offset = pageNum * pageCount
    return await this.repo.limit(pageCount).offset(offset).getManyAndCount()
  }

  async add(body) {
    return await this.repo.insert().values(body).execute()
  }

  async update(id, body) {
    return await this.repo
      .update()
      .where(this.whereQuery, { id: id })
      .set(body)
      .execute()
  }

  async delete(id) {
    return await this.repo.delete().where(this.whereQuery, { id: id }).execute()
  }
}

module.exports = {
  Controller,
}
