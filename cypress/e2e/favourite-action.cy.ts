describe('action with favourite feature', () => {
    beforeEach(() => {
        cy.intercept(
            'GET',
            'https://api.spaceflightnewsapi.net/v4/articles?limit=9&offset=0',
            {
                fixture: 'news-information.json'
            }
        )

        cy.visit('http://localhost:3000/signin')

        cy.viewport(1000, 1000)

        cy.get('[data-test-id="signin-email"]').as('email')
        cy.get('[data-test-id="signin-password"]').as('password')
        cy.get('[data-test-id="signin-button-confirm"]').as('button')
        cy.get('@email').type('test@mail.ru')
        cy.get('@password').type('123456')
        cy.get('@button').click()

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000)

        cy.visit('http://localhost:3000/news')
    })

    it('action with favourite', () => {
        cy.get('[data-test-id="news-card-title"]').as('news-card-title')
        cy.get('@news-card-title').first().should('have.text', 'TEST')
        cy.get('[data-test-id="toggle-favourite-button"]').as(
            'toggle-favourite'
        )

        cy.get('[data-test-id="open-panel-button"]').as('open-panel-news')
        cy.get('@open-panel-news').first().click()
        cy.get('@toggle-favourite').as('toggle-favourite-button')
        cy.get('@toggle-favourite-button').first().click()

        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(2000)

        cy.visit('http://localhost:3000/favorites/')

        cy.get('@news-card-title').first().should('have.text', 'TEST')
        cy.get('@open-panel-news').first().click()
        cy.get('@toggle-favourite-button').first().click()

        cy.get('@news-card-title').should('not.contain', 'TEST')
    })
})
