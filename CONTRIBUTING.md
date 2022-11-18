_Welcome to Afrisplash, and thank you for contributing to this project. Please take your time to study this document carefully before making any changes to the codebase, to ensure you're on the same page with the rest of the team and we can all collaborate seamlessly._

# Workflow

This project uses the [Fork & Pull Model](https://help.github.com/en/articles/about-collaborative-development-models)
for receiving contributions. Read about the Fork & Pull Model
[here](https://help.github.com/en/articles/about-collaborative-development-models).

## Branch Structure

### Upstream

The main / original / upstream (hereinafter upstream) repository will have only two (2) branches - main and development. Additional hotfix branches may be created to work on critical bugs in the deployment.  
**'_development_' - The Integration branch.** This is where features from the different forks are brought together. Contributors should submit pull requests here. This is the default branch. The maintainers will be responsible for bringing it all together and resolving any possible merge conflicts that may arise.  
**'_main_' - The deployment branch.** The code on this branch goes live to our hosting servers and must be kept in pristine condition. When the integration (development) branch has a complete feature/fixes, the deployment (main) branch is updated via pull request.

### Forks

Each fork represents work on a specific feature or task. Fork this repository to your own account and do all your work there. Do your work on the development branch or create a new branch for yourself, then create a pull request to the `development` branch of the main (upstream) repo. You may choose to rename your forked repo to include a description of what feature you are working on. Example: afrisplace-backend\_\_feature-name.

### Staying Updated

When working with many people on the same codebase, sometimes others make changes that affect your work. While great care has been taken to create a modular team workflow to keep this to a minimum, merge conflicts are inevitable. It would _suck_ to finish working on a task or feature, only to find that the codebase has evolved and you need to rework everything to conform to the new changes. This is managed in two ways.  
**_First_**, please ensure your work is in line with our specifications. Understand the folder structure and stick to it. Study the screens on figma and identify any tasks that your work may depend on or that relates to yours in some way. Contact the maintainers should you need any clarification. It is advisable to ensure you are on the same page with everyone else. This is your responsibility. Non-compliant submission may be rejected.  
**_Second_**, ensure that at every given time, your working directory is up-to-date with the latest changes from the upstream _development_ branch.

#### Pulling Upstream

After setting up your fork on github and cloning it locally on your system, you'll need to run a command just once to create a connection between your local repository and the remote upstream repository. Note that there's automatically a remote 'origin' repository set up when you clone. This points to your fork. Now you need to set up 'upstream' which will point to the central upstream repo.

0. Open a terminal and go into the directory for the newly cloned repo. Now add the upstream remote like so:  
    <pre>git remote add upstream https://github.com/AfriSplash-Remotely/Afrisplash-Backend.git</pre>
   PS: _You may get an error saying the `upstream` remote has already been configured. If so, then you are good to go._

Now you're all set up.  
**_The following steps must be run periodically to keep your work up-to-date! You can run these commands as often as every hour. You want to fetch any new changes as soon as possible. Each time you want to begin working, or take a break from your work, run these first._**  
Be sure to [stash](https://dev.to/neshaz/how-to-git-stash-your-work-the-correct-way-cna)
or commit all local changes first.

1. Switch to the development branch
<pre>git checkout development</pre>
2. Get all remote upstream changes into your local computer.
<pre>git fetch upstream</pre>
3. Merge changes fetched with your local development branch. ('development' must be the currently checked-out branch)
<pre>git merge upstream/development</pre>
4. Push the newly merged changes to your fork's remote (online) repo. This is configured as 'origin' by default.
<pre>git push origin development</pre>

If you've created a new branch to work on rather than working directly on `development`, then run the next steps.

5. Switch to your feature branch.
<pre>git checkout your-feature-branch</pre>
6. Merge the changes on the newly merged development branch, into your feature branch.
   <pre>git merge development</pre>

   _You may encounter merge conflicts here.
   [Resolve them](https://help.github.com/en/articles/resolving-a-merge-conflict-using-the-command-line),
   then come back and complete the merge. If you merge often enough, any conflicts would be trivial and very few._

7. Finally, push your newly merged feature branch to the remote github server for backup.
<pre>git push origin your-feature-branch</pre>

##### This will be the file and folder structure

    ├── auto
    ├── bin
    ├── config
           ├── config.env
           ├── database.js
    ├── controllers
    ├── docs
    ├── mail
          ├── template
    ├── middlewares
    ├── models
    ├── public
          ├── stylesheets
    ├── routes
    ├── target
    ├── test
    ├── utils
    └── views

<hr/>
