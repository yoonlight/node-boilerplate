// @ts-check

const passport = require('passport')
const { Router, Request, Response, NextFunction } = require('express')
const myEmitter = require('event')
const { Container } = require('typedi');
const { Controller } = require('controller');

class User {
  router
  /**
   * @param {Container} container
   */
  constructor(container) {
    this.router = Router()
    /**
     * @type {Controller}
     */
    this.query = container.get('authController')
    this.router.get('/', this.list)

    this.router.get('/profile/:id',
      passport.authenticate('jwt', {
        failureRedirect: '/api/auth/fail'
      }),
      this.getProfile
    )

    this.router.patch('/:id', this.updateProfile)
  }
  /**
  * @param {Request} req
  * @param {Response} res
  */
  list = async (req, res) => {
    try {
      const q = req.query
      const result = await this.query.list(q)
      const message = {
        title: 'Action',
        text: 'Check User List'
      }
      myEmitter.emit('Slack', message)
      myEmitter.emit('MQ', result)
      res.json(result)
    } catch (error) {
      console.error(error)
    }
  }
  /**
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  */
  getProfile = async (req, res, next) => {
    const headers = req.headers.authorization
    if (headers) {
      console.log(headers);
    }
    try {
      const result = await this.query.get(req.params.id)
      res.json(result)
    } catch (error) {
      console.log(error)
    }
  }
  /**
  * @param {Request} req
  * @param {Response} res
  */
  updateProfile = async (req, res) => {
    const body = req.body
    const id = req.params.id
    try {
      const result = await this.query.update(id, body)
      res.json(result)
    } catch (e) {
      res.send(e)
    }
  }
}

module.exports = {
  User
};
