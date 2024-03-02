import { search } from '../fixtures/search-information'

describe('Guest. Search. Unit of information', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')

        cy.intercept('GET', '**/articles', req => {
            req.reply({
                status: 200,
                body: {
                    results: search.data.results
                }
            })
        })

        cy.viewport(1000, 660)

        cy.get('[data-test-id="search-input"]').as('search')

        cy.get('@search').focus()
        cy.get('@search').type('space')
        cy.get('@search').type('{enter}')
    })

    it('has list', () => {
        cy.get('[data-test-id="search-list"]').as('list')
        cy.get('@list').should('have.length', 1)
    })

    it('has links and can route', () => {
        cy.get('[data-test-id="search-link"]').as('link')
        cy.get('@link').should('have.length.below', 6)
        cy.get('[data-test-id="search-link"]').first().as('first-link')
        cy.get('@first-link').click()

        cy.intercept('GET', '**/articles', req => {
            req.reply({
                status: 200,
                body: {
                    results: search.data.results[0]
                }
            })
        })

        cy.get('[data-test-id="post-search-title"]').as('title')
        cy.get('@title').should('have.text', 'TEST')
        cy.get('[data-test-id="post-search-date"]').as('date')
    })
})
