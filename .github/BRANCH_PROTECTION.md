# Branch Protection Rules Configuration

This document provides instructions for setting up branch protection rules to prevent automatic merging, even when all CI checks pass.

## Overview

Branch protection rules ensure that:
- ✅ All CI checks must pass
- ✅ At least one code review is required
- ✅ No automatic merging (manual approval required)
- ✅ Force pushes are blocked
- ✅ Branch deletion is prevented

## Manual Configuration Steps

Since branch protection rules are configured in GitHub's UI, follow these steps:

### For the `develop` branch:

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Click on **Branches** in the left sidebar

2. **Add Branch Protection Rule**
   - Click **Add branch protection rule** or **Add rule**
   - In the **Branch name pattern** field, enter: `develop`

3. **Configure Protection Settings**

   **a. Require pull request reviews before merging**
   - ✅ Check **Require a pull request before merging**
   - ✅ Check **Require approvals** and set to **1**
   - ✅ Check **Dismiss stale pull request approvals when new commits are pushed**
   - ⬜ (Optional) Check **Require review from Code Owners** if you have a CODEOWNERS file
   - ⬜ (Optional) Check **Restrict who can dismiss pull request reviews**

   **b. Require status checks to pass before merging**
   - ✅ Check **Require status checks to pass before merging**
   - ✅ Check **Require branches to be up to date before merging**
   - Under **Status checks that are required**, select:
     - `Build with 22.x`
     - `Build with 24.x`
     - `Run static checks`

   **Note**: The exact status check names will appear after the first CI run. You can find them in any PR's "Checks" tab.

   **c. Additional Protection Rules**
   - ✅ Check **Require conversation resolution before merging**
   - ✅ Check **Require signed commits** (optional, if you want to enforce commit signing)
   - ✅ Check **Require linear history** (optional, prevents merge commits)
   - ✅ Check **Include administrators** (recommended: enforce rules for admins too)

   **d. Restrict pushes**
   - ✅ Check **Do not allow bypassing the above settings**
   - ⬜ (Optional) Check **Restrict who can push to matching branches** and add specific teams/users

   **e. Additional Rules**
   - ✅ Check **Do not allow force pushes**
   - ✅ Check **Do not allow deletions**

4. **Save the Rule**
   - Click **Create** or **Save changes**

### For the `main` branch (if it exists):

Follow the same steps as above, but with stricter settings:
- Set **Require approvals** to **2** (instead of 1)
- ✅ Check **Require review from Code Owners**
- ✅ Check **Include administrators**

## Quick Reference: Key Settings

To prevent automatic merging, ensure these are checked:

| Setting | Purpose |
|---------|---------|
| ✅ Require a pull request before merging | Blocks direct pushes |
| ✅ Require approvals (set to 1+) | Prevents auto-merge without review |
| ✅ Require status checks to pass | Ensures CI passes |
| ✅ Require branches to be up to date | Prevents merging outdated code |
| ✅ Require conversation resolution | Blocks merge if there are unresolved comments |
| ✅ Include administrators | Applies rules to admins too |

## What This Achieves

With these settings:

✅ **No Automatic Merging**: Even if all CI checks pass, a PR cannot be merged without:
   - At least 1 approval (2 for main branch)
   - All required status checks passing
   - Branch being up to date

✅ **Prevents Accidental Merges**: Dependabot PRs and other automated PRs require manual review

✅ **Maintains Code Quality**: Ensures all changes are reviewed before merging

✅ **Protects Critical Branches**: Prevents force pushes and deletions

## Testing the Configuration

After setting up branch protection:

1. Create a test PR to the `develop` branch
2. Wait for CI checks to pass
3. Verify that the **Merge** button is disabled until you approve the PR
4. Approve the PR and verify you can now merge

## Using GitHub Settings App (Alternative)

If you have the [GitHub Settings app](https://github.com/apps/settings) installed, you can use the `.github/settings.yml` file in this repository to automatically configure branch protection rules.

## Important Notes

- Branch protection rules apply to **all** PRs, including Dependabot PRs
- Admins can still bypass rules if "Include administrators" is unchecked (not recommended)
- The rules take effect immediately after saving
- You can modify or remove rules at any time in the repository settings

## Troubleshooting

**Issue**: PR shows "Merging is blocked" even after approval
- **Solution**: Ensure all required status checks have passed and the branch is up to date

**Issue**: Can't push to protected branch
- **Solution**: Create a branch and open a PR instead (direct pushes to protected branches are blocked)

**Issue**: Dependabot can't merge its own PRs
- **Solution**: This is expected behavior - Dependabot PRs require manual review and approval

**Issue**: Status check names don't match
- **Solution**: After your first CI run, check the exact job names in the PR's "Checks" tab and update the branch protection rule accordingly
