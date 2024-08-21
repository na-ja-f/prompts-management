import { v4 as uuidv4 } from 'uuid';

export default class prompts {
    constructor(prompts, users) {
        this.prompts = prompts
        this.users = users
    }

    // find user by username
    findUser(username) {
        return this.users.find(user => user.username === username)
    }

    // get all accessible prompts
    getAll(username) {
        const user = this.findUser(username)
        if (!user) {
            throw new Error('user not found')
        }

        return this.prompts.filter(prompt => {
            if (prompt.visibility === 'public') {
                return true
            }
            if (prompt.visibility === 'private' && prompt.actor.username === username) {
                return true
            }
            if (prompt.visibility === 'custom' && prompt.sharedAccess.includes(username)) {
                return true
            }
            return false
        })
    }

    // get specific prompts using their id
    get(username, id) {
        const user = this.findUser(username)
        if (!user) {
            throw new Error('user not found')
        }

        const prompt = this.prompts.find(p => p._id.$oid === id)
        if (!prompt) {
            throw new Error('prompt not found')
        }

        if (prompt.visibility === 'public' || prompt.visibility === 'private' && prompt.actor.username === username || prompt.visibility === 'custom' && prompt.sharedAccess.includes(username)) {
            return prompt
        } else {
            throw new Error('dont have access')
        }
    }

    // create new prompt
    create(username, newPrompt) {
        const user = this.findUser(username)
        if (!user) {
            throw new Error('user not found')
        }

        let uniqueId = uuidv4()
        newPrompt._id = uniqueId
        newPrompt.actor = { username }
        this.prompts.push(newPrompt)
        return newPrompt
    }

    // update
    update(username, id, updatedData) {
        const user = this.findUser(username);
        if (!user) {
            throw new Error('User not found');
        }

        const prompt = this.prompts.find(p => p._id.$oid = id)
        if (!prompt) {
            throw new Error('Prompt not found');
        }


        if (prompt.actor.username !== username) {
            throw new Error('You can only update your own prompts');
        }

        Object.assign(prompt, updatedData);
        return prompt;
    }

    // delete
    delete(username, id) {
        const user = this.findUser(username)
        if (!user) {
            throw new Error('User not found');
        }
        const prompt = this.prompts.find(p => p._id.$oid === id)
        if (prompt === -1) {
            throw new Error('Prompt not found');
        }

        if (prompt.actor.username !== username) {
            throw new Error('You can only delete your own prompts');
        }

        let promptIndex = this.prompts.indexOf(prompt)
        this.prompts.slice(promptIndex, 1)
        return true
    }
}

