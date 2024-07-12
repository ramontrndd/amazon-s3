import connection  from '../config/db.config'

export interface Image { 
  id?: number;
  name: string;
  url: string;
}

export const saveImage = (image: Image, callback: (err: Error | null, results?: any )=> void ) => {
  const sql = 'INSERT INTO images (name, url) VALUES (?,?)'
  connection.query(sql, [image.name, image.url], (err, results) => {
    if (err) {
      return callback(err);
    }
    callback(null, results);
  });


}