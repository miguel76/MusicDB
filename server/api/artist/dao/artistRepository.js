/**import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import * as _ from 'lodash';

artistSchema.statics.getAll = (): Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        let _query = {};

      Artist
          .find(_query)
          .exec((err, artists) => {
              err ? reject(err)
                  : resolve(artists);
          });
    });
}

artistSchema.statics.getByName = (name: String): Promise<any> => {
  return new Promise((resolve:Function, reject:Function) => {
    let _query = {name: name};

    Artist
      .findOne(_query)
      .exec((err, artists) => {
        err ? reject(err)
          : resolve(artists);
      });
  });
}

artistSchema.statics.createArtist = (artist: Object): Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
      if (!_.isObject(artist)) {
        return reject(new TypeError('Artist is not a valid object.'));
      }

      var _artist = new Artist(artist);

      _artist.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

artistSchema.statics.deleteArtist = (id: string): Promise<any> => {
    return new Promise((resolve:Function, reject:Function) => {
        if (!_.isString(id)) {
            return reject(new TypeError('Id is not a valid string.'));
        }

      Artist
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

let Artist = mongoose.model('Artist', artistSchema);

export default Artist;**/
//# sourceMappingURL=artistRepository.js.map