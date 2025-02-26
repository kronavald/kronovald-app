import { Button } from "@/shared/ui/button"

import { KRONOVALD_GITHUB_URL } from "@/shared/const"
import { GithubIcon } from "@/shared/icons/github-icon"

const KronovaldGithubLinkButton = () => (
    <Button size="icon" className="rounded-full">
        <a href={KRONOVALD_GITHUB_URL} target="_blank" rel="noreferrer">
        <GithubIcon />
        </a>
    </Button>
)

export default KronovaldGithubLinkButton
