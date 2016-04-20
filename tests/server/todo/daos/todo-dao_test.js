import mongoose from 'mongoose';
import TodoDAO from '../../../../server/api/artist/dao/artistRepository';
import {expect} from 'chai';
import {setupMongoose, createTodos} from '../../_helpers/db';

describe('todo.dao', () => {
    before(() => {
        setupMongoose(mongoose);
    });

    afterEach(() => {
        TodoDAO.remove();
    })

    describe('getAll', () => {
        beforeEach((done) => {
            createTodos()
            .then(() => done())
            .catch(() => done());
        })

        it('should get all todos', (done) => {
            let _onSuccess = todos => {
                expect(todos).to.be.defined;
                expect(todos[0]).to.have.property('todoMessage').and.to.equal('a0');
                expect(todos[0]).to.have.property('createdAt').and.to.be.defined;

                done();
            }

            let _onError = () => {
                expect(true).to.be.false; // should not come here;
            }

            TodoDAO
              .getAll()
              .then(_onSuccess)
              .catch(_onError);
        })
    })

    describe('createArtist', () => {
        it('should throw an error, object passed is not defined', (done) => {
            let _undefinedTodo = undefined;

            let _onSuccess = () => {
                expect(true).to.be.false; // should not come here;
            }

            let _onError = error => {
                expect(error).to.be.defined;

                done();
            }

            TodoDAO
              .createArtist(_undefinedTodo)
              .then(_onSuccess)
              .catch(_onError);
        })

        it('should create the artist correctly', (done) => {
            let _todo = {todoMessage: 'abc'};

            let _onSuccess = todo => {
                expect(todo).to.be.defined;
                expect(todo.todoMessage).to.equal('abc');
                expect(todo.createdAt).to.be.defined;

                done();
            }

            let _onError = () => {
                expect(true).to.be.false;
            }

            TodoDAO
              .createArtist(_todo)
              .then(_onSuccess)
              .catch(_onError);
        })
    })

    describe('deleteArtist', () => {
        beforeEach((done) => {
            createTodos()
              .then(() => done())
              .catch(() => done());
        })

        it('should get an error back, id is not defined', (done) => {
            let _id = null;

            let _onSuccess = () => {
                expect(true).to.be.false;
            }

            let _onError = error => {
                expect(error).to.be.defined;

                done();
            }

            TodoDAO
              .deleteArtist(_id)
              .then(_onSuccess)
              .catch(_onError);
        })

        it('should delete the doc successfully', (done) => {
          let _id = '507c7f79bcf86cd7994f6c10';

          let _onSuccess = () => {
            expect(true).to.be.true;

            done();
          }

          let _onError = () => {
            expect(true).to.be.false;
          }

          TodoDAO
            .deleteArtist(_id)
            .then(_onSuccess)
            .catch(_onError);
        })
    })
})
