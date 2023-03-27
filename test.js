const WebUntis = require('webuntis');
const {describe, expect, test, beforeEach, afterEach} = require('@jest/globals');
const customConfig = require('./custom-config');

describe('Connection', () => {
    test('Connect to API', () => {
        const untis = new WebUntis(
            customConfig.school,
            customConfig.eduClusterUser,
            customConfig.eduClusterPassword,
            customConfig.schoolBaseUrl,
        );

        expect(untis).not.toBeNull();
        expect(untis).not.toBeUndefined();
    });

    test('Login & Logout', async () => {
        const untis = new WebUntis(
            customConfig.school,
            customConfig.eduClusterUser,
            customConfig.eduClusterPassword,
            customConfig.schoolBaseUrl,
        );

        const authenticatedClient = await untis.login();
        expect(authenticatedClient).toHaveProperty('sessionId');
        expect(authenticatedClient).toHaveProperty('personType');
        expect(authenticatedClient).toHaveProperty('personId');
        expect(authenticatedClient).toHaveProperty('klasseId');

        const logoutSuccessful = await untis.logout();
        expect(logoutSuccessful).toBeTruthy();
    });
});

describe('?', () => {
    let untis;

    beforeEach(() => {
        untis = new WebUntis(
            customConfig.school,
            customConfig.eduClusterUser,
            customConfig.eduClusterPassword,
            customConfig.schoolBaseUrl,
        );
    });

    afterEach(() => {
        untis = null;
    });

    // TODO Christoph: Tests schreiben
    // TODO Christoph: .env Datei erstellen und Benutzername und Passwort eintragen (siehe "ACHTUNG" in Datei custom-config)
});