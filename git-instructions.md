# Github Instructions

## Step 0:

BEFORE following these steps ensure that you have:
- Git installed
- VSCode installed
- GitLens extension installed on VSCode

You also MAY need to run the following commands:

`git config --global user.name "username (name used for Github)`

`git config --global user.email "email address (used for Github)"`

## Step 1: Initial Github Fork Instructions

First, open the Original Github repo.
Run the git clone command:

`git clone <repo_url>` (clone forked repo)

`cd <repo_name>` (navigate to dir)

## When beginning to work 

Then to begin working you must UPDATE your code:

`git fetch` (ALWAYS run this command before working in order to keep your code up-to-date)

## Saving changes you have made using Git

Now you are ready to start working, so you must create a branch (before or after making changes):

`git checkout -b <branch_name>` (CREATES new branch, remove -b for switching ONLY)

Use VSCode Source Control OR GitLens to stage and commit any changes.
Alternatively, use terminal:

`git add .` (Stage all changes within the dir)

`git add <file> <file> ...` (Stage only specific files)

`git commit -m "Commit message"` (Commit the staged changes and include description)

Once a commit is made, push it through either Source Control OR GitLens.
Alternatively, use terminal:


`git push origin <branch-name>` (For future pushes to the same branch)

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
