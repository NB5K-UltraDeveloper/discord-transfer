const { REST } = require('@discordjs/rest')
const querystring = require('querystring')

class DiscordAPI {
    /**
     * Create discord API wrapper
     * @param opts
     */
    constructor(opts) {
        this.channelId = opts.channelId
        this.rest = new REST({ version: 9 }).setToken(opts.token)
    }

    /**
     * Fetch messages
     * @param {Object} query
     * @return {Promise<*>}
     */
    async fetchMessages(query) {
        const endpoint = `/channels/${this.channelId}/messages`

        return this.rest.get(endpoint, { query: querystring.encode(query) })
    }

    /**
     * Send message on channel
     * @param {Object|String} content
     * @param {Object[]} attachments
     * @return {Promise<*>}
     */
    async createMessage(content, attachments = []) {
        const endpoint = `/channels/${this.channelId}/messages`
        const requestData = {
            attachments,
            body: {
                content: typeof content === 'string' ? content : JSON.stringify(content),
            },
        }

        return this.rest.post(endpoint, requestData)
    }

    /**
     * Delete message for given messageId
     * @param {String} messageId
     * @return {Promise<*>}
     */
    async deleteMessage(messageId) {
        const endpoint = `/channels/${this.channelId}/messages/${messageId}`

        return this.rest.delete(endpoint)
    }
}

module.exports = DiscordAPI
