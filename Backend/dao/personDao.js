const helper = require('../helper.js');
const AdresseDao = require('./adresseDao.js');

class PersonDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const adresseDao = new AdresseDao(this._conn);

        var sql = 'SELECT * FROM Person WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        if (result.anrede == 0) 
            result.anrede = 'Herr';
        else 
            result.anrede = 'Frau';

        result.adresse = adresseDao.loadById(result.adresseId);
        delete result.adresseId;

        return result;
    }

    loadAll() {
        const adresseDao = new AdresseDao(this._conn);

        var sql = 'SELECT * FROM Person';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            if (result[i].anrede == 0) 
                result[i].anrede = 'Herr';
            else 
                result[i].anrede = 'Frau';
            
            result[i].adresse = adresseDao.loadById(result[i].adresseId);
            delete result[i].adresseId;
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Person WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

<<<<<<< HEAD
<<<<<<< HEAD
    create(anrede, vorname = '', nachname = '', firma = '', ustid = '', email = '', strassenr = '', plz = '', ort = '', land = '') {
        var sql = 'INSERT INTO Person (anrede,vorname,nachname,firma,ustid,email,strassenr, plz, ort, land) VALUES (?,?,?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [anrede, vorname, nachname, firma, ustid, email, strassenr, plz, ort, land, email];
=======
    create(anrede, vorname = '', nachname = '', email = '') {
        var sql = 'INSERT INTO Person (anrede,vorname,nachname,email) VALUES (?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [anrede, vorname, nachname, email];
>>>>>>> 637bb5cf52e56d73c276f1ce8c56a885f4946367
=======
    create(anrede, vorname = '', nachname = '', firma = '', ust = '', email = '', adresseId) {
        if (anrede.toLowerCase() == 'frau') 
            anrede = 1;
        else 
            anrede = 0;

        var sql = 'INSERT INTO Person (anrede,vorname,nachname,firma,ust,email,adresseId) VALUES (?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [anrede, vorname, nachname, firma, ust, email, adresseId];
>>>>>>> 3c4adc8641fc0f2849d10660ee8d7d217564d22d
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

<<<<<<< HEAD
<<<<<<< HEAD
    update(id, anrede, vorname = '', nachname = '', firma = '', ustid = '', email = '', strassenr = '', plz = '', ort = '', land = '') {
        var sql = 'UPDATE Person SET anrede=?,vorname=?,nachname=?,firma=?,ustid=?,email=?,strassenr=?,plz=?,ort=?,land=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [anrede, vorname, nachname, firma, ustid, email, strassenr, plz, ort, land, email];
=======
    update(id, anrede, vorname = '', nachname = '', email = '') {
        var sql = 'UPDATE Person SET anrede=?,vorname=?,nachname=?,email=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [anrede, vorname, nachname, email];
>>>>>>> 637bb5cf52e56d73c276f1ce8c56a885f4946367
=======
    update(id, anrede, vorname = '', nachname = '', firma = '', ust = '', email = '', adresseId) {
        if (anrede.toLowerCase() == 'frau') 
            anrede = 1;
        else 
            anrede = 0;

        var sql = 'UPDATE Person SET anrede=?,vorname=?,nachname=?,firma=?,ust=?,email=?,adresseId=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [anrede, vorname, nachname, firma, ust, email, adresseId];
>>>>>>> 3c4adc8641fc0f2849d10660ee8d7d217564d22d
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Person WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('PersonDao [_conn=' + this._conn + ']');
    }
}

module.exports = PersonDao;