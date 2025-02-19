# Github Instructions

## Initial Github Fork Instructions

First open the Original Github repo, and press the fork button, and create a fork.
Once created, ensure that the fork is up-to-date by pressing the Sync fork button on the main page of the forked repo.
Run the git clone command USING YOUR FORK's repo:

`git clone <forked_repo_url>` (clone forked repo)

`cd <fordked_repo_name>` (navigate to dir)

`git remote add upstream <original_repo_url>` (Links forked repo and allows you to upstream your work to original repo)

## Working with Github repo

Then to begin working you must UPDATE your code:

`git fetch upstream` (ALWAYS run this command before working in order to keep your code up-to-date)

`git checkout main` (OR replace main with the specific branch you are working on)

`git merge upstream/main` (Merges latest changes from upstream to your local main)

Now you are ready to start working, so you must create a branch (before or after making changes):

`git checkout -b <branch_name>` (switches to existing branch OR creates new branch, can be done before or after making changes)

`git merge main` (Merge main into current feature branch)

Use VSCode Source Control OR GitLens to stage and commit any changes.
Alternatively, use terminal:

`git add .` (Stage all changes within the dir)

`git add <file> <file> ...` (Stage only specific files)

`git commit -m "Commit message"` (Commit the staged changes and include description)

Once a commit is made, push it through either Source Control OR GitLens.
Alternatively, use terminal:

`git push -u origin <branch-name>` (Push changes to forked repo, adding upstream tracking)

`git push origin <branch-name>` (For future pushes to the same branch, no need to use -u flag again)

Publish the branch to UPSTREAM, using Source Control OR GitLens (through the pop-up at the top of the screen)

Owner of the original Repo (karsten) must create a pull request to merge the main branch with the branch you have created and pushed to.
Once the branches are merged in the original repo, it is recommended to update your local code by running:

`git checkout main`

`git pull upstream main`

Then you should update the forked repo:

`git push origin main`

## Working with Github repo (as owner)

Original repo owner (karsten) may update his local code by running:

`git checkout main`

`git pull`
