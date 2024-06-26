import React from 'react'
import {View} from 'react-native'
import {AppBskyActorDefs} from '@atproto/api'
import {Trans} from '@lingui/macro'

import {Shadow} from '#/state/cache/types'
import {isInvalidHandle} from 'lib/strings/handles'
import {isAndroid} from 'platform/detection'
import {atoms as a, useTheme, web} from '#/alf'
import {NewskieDialog} from '#/components/NewskieDialog'
import {Text} from '#/components/Typography'

export function ProfileHeaderHandle({
  profile,
  disableTaps,
}: {
  profile: Shadow<AppBskyActorDefs.ProfileViewDetailed>
  disableTaps?: boolean
}) {
  const t = useTheme()
  const invalidHandle = isInvalidHandle(profile.handle)
  const blockHide = profile.viewer?.blocking || profile.viewer?.blockedBy
  return (
    <View
      style={[a.flex_row, a.gap_xs, a.align_center]}
      pointerEvents={disableTaps ? 'none' : isAndroid ? 'box-only' : 'auto'}>
      <NewskieDialog profile={profile} disabled={disableTaps} />
      {profile.viewer?.followedBy && !blockHide ? (
        <View style={[t.atoms.bg_contrast_25, a.rounded_xs, a.px_sm, a.py_xs]}>
          <Text style={[t.atoms.text, a.text_sm]}>
            <Trans>Follows you</Trans>
          </Text>
        </View>
      ) : undefined}
      <Text
        numberOfLines={1}
        style={[
          invalidHandle
            ? [
                a.border,
                a.text_xs,
                a.px_sm,
                a.py_xs,
                a.rounded_xs,
                {borderColor: t.palette.contrast_200},
              ]
            : [a.text_md, a.leading_tight, t.atoms.text_contrast_medium],
          web({wordBreak: 'break-all'}),
        ]}>
        {invalidHandle ? <Trans>⚠Invalid Handle</Trans> : `@${profile.handle}`}
      </Text>
    </View>
  )
}
