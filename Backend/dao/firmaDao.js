const helper = require('../helper.js');
const AdresseDao = require('./adresseDao.js');
const PersonDao = require('./personDao.js');

class FirmaDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        const adresseDao = new AdresseDao(this._conn);
        const personDao = new PersonDao(this._conn);

        var sql = 'SELECT * FROM Firma WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result.adresse = adresseDao.loadById(result.adresseId);
        delete result.adresseId;


        if (helper.isNull(result.ansprechpartnerId)) {
            result.ansprechpartner = null;
        } else {
            result.ansprechpartner = personDao.loadById(result.ansprechpartnerId);
        }
        delete result.ansprechpartnerId;

        return result;
    }

    loadAll() {
        const adresseDao = new AdresseDao(this._conn);
        const personDao = new PersonDao(this._conn);

        var sql = 'SELECT * FROM Firma';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        for (var i = 0; i < result.length; i++) {
            result[i].adresse = adresseDao.loadById(result[i].adresseId);
            delete result[i].adresseId;


            if (helper.isNull(result[i].ansprechpartnerId)) {
                result[i].ansprechpartner = null;
            } else {
                result[i].ansprechpartner = personDao.loadById(result[i].ansprechpartnerId);
            }
            delete result[i].ansprechpartnerId;
        }

        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Firma WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(name = '', ustid = '', adresseId = '', ansprechpartnerId = '') {
        var sql = 'INSERT INTO Firma (name,ustid,adresseId,ansprechpartnerId) VALUES (?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [name, ustid, adresseId, ansprechpartnerId];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, name = '', ustid = '', adresseId = '', ansprechpartnerId = '') {
        var sql = 'UPDATE Firma SET name=?,ustid=?,adresseId=?,ansprechpartnerId=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [name, inhaber, ustid, adresseId, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Firma WHERE id=?';
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
        console.log('FirmaDao [_conn=' + this._conn + ']');
    }
}

module.exports = FirmaDao;